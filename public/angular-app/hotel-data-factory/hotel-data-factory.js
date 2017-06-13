angular.module('meanhotel').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory ($http){
    return {
        hotelList : hotelList,
        hotelDisplay : hotelDisplay,
        postReview: postReview
    };


    function hotelList(){
        return $http.get('api/hotels').then(complete).catch(failed);
    }

    function hotelDisplay(id){
        return $http.get('api/hotels/' + id).then(complete).catch(failed);
    }

    function postReview(id, postData){
        // You have to specify the data by adding the parameter postData
        return $http.post("api/hotels/" + id +"/reviews", postData).then(complete).catch(failed);
    }

    function complete(response){
        return response.data;
    }

    function failed(error){
        console.log(error.statusText);
    }
}
