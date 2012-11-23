eventMap.MapController = function( $scope ,$rootScope, MapData, MapService,ImageLoader) {

    $scope.mapData = null;

    var imagesLoaded = false;

    $scope.$on('mapIsLoaded', function() {
        MapData.loadInfoData();
    });

    $scope.$on('actualizeData', function(event,filter) {
        MapService.clearBorder();
        if(filter) MapData.filterData(filter);
        MapData.clusterData();

        $scope.mapData = MapData.getMapData();

        if(!imagesLoaded){
            ImageLoader.setOnLoad(function(){
                imagesLoaded = true;
                jQuery('#container').removeClass('hide-element');
                MapService.showMapData($scope.mapData);
                $scope.$apply($rootScope.$broadcast('$routeUpdate'));
            });
            ImageLoader.loadImages();
        }
        else{
            jQuery('#filter-bar').removeClass('hide-element');
            MapService.showMapData($scope.mapData);
        }

    });
};