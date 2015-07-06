'use strict';

/**
 * @ngdoc function
 * @name gsaApp.controller:DemoController
 * @description
 * # DemoController
 * Controller of the gsaApp
 */
angular.module('gsaApp')
    .controller('DemoController', function ($scope,$rootScope) {
    $scope.$on('$routeChangeSuccess', function (event, data) {
                $rootScope.pageTitle = data.title;
            });
    })
    .directive('d3Chart', ['$http', function($http){

        function link(scope, element){
          function remapDayResultsToMonths(dayResults){
                var monthResults = [];
                var timeCount = {};
                dayResults.forEach(function(item){
                    item.count = +item.count;
                    var monthYear = item.time.substr(0, 6);
                    if(timeCount[monthYear]){
                        timeCount[monthYear] = timeCount[monthYear] + item.count;
                    }else{
                        timeCount[monthYear] = item.count;
                    }
                });
                for (var key in timeCount){
                    monthResults.push({
                        time: key,
                        count: timeCount[key]
                    });
                }
                return monthResults;
            }

            function getDate(dateStr){
                return new Date(dateStr.substr(0,4)+'-'+dateStr.substr(4,2)+'-'+'01');
            }

            function renderChart(filterUrl){
                var margin = {top: 20, right: 20, bottom: 60, left: 60};
                var width = 800 - margin.left - margin.right;
                var height = 600 - margin.top - margin.bottom;
                var x = d3.time.scale().range([0, width]);
                var y = d3.scale.linear()
                    .range([height, 0]);
                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom')
                    .tickFormat(d3.time.format('%Y-%m'));
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');
                var line = d3.svg.line()
                    .x(function(d) { return x(d.time); })
                    .y(function(d) { return y(d.count); });

                var results;
                $http.get(filterUrl).success(function(data){
                    results = data.results;
                    results = remapDayResultsToMonths(results);

                    results.forEach(function(item){
                        item.time = getDate(item.time);
                    });

                    x.domain(d3.extent(results, function(d) {
                        return d.time;
                    }));
                    y.domain(d3.extent(results, function(d) { return d.count; }));

                    element.html('');
                    var viewBoxWidth = width + margin.left + margin.right;
                    var viewBoxHeight = height + margin.top + margin.bottom;

                    var svg = d3.select(element[0]).append('svg')
                        //.attr('width', width + margin.left + margin.right)
                        //.attr('height', height + margin.top + margin.bottom)
                        .attr('viewBox', '0 0 '+viewBoxWidth+' '+viewBoxHeight)
                        // .attr('style', 'width: 100%; height: 100%')
                        .attr('class', 'svgChart')
                        .attr('aria-label', 'Adverse drug event reports since 2004 Graph')
                        .append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                    svg.append('g')
                        .attr('class', 'y axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(xAxis)
                        .append('text')
                        .attr('x', width/2)
                        .attr('dy', '3em')
                        .attr('font-weight','bold')
                        .style('text-anchor', 'middle')
                        .style('font-size','16px')
                        .text('Date');

                    svg.append('g')
                        .attr('class', 'y axis')
                        .call(yAxis)
                        .append('text')
                        .attr('transform', 'rotate(-90)')
                        .attr('x', -250)
                        .attr('y', -60)
                        .attr('dy', '.71em')
                        .attr('font-weight','bold')
                        .style('font-size','16px')
                        .style('text-anchor', 'end')
                        .text('Count');

                    svg.append('path')
                        .datum(results)
                        .attr('class', 'line')
                        .attr('d', line);

                    svg.selectAll('.xaxis text'). // select all the text elements for the xaxis
                        attr('transform', function() {
                            return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-45)';
                        });


                });

            }

            scope.$watch('filterUrl', function(value){
                renderChart(value);
            });

            renderChart(scope.filterUrl);
        }

        return {
            link: link
        };
    }]);
