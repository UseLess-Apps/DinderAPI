module.exports.cleanRestaurant = function(blob) {
    // lets get this big boi going
    return {
        "id": blob.restaurant.id,
        "name": blob.restaurant.name,
        "thumbnail": blob.restaurant.thumb,
        "location": blob.restaurant.location,
        "price": blob.restaurant.price_range,
        "user_rating": blob.restaurant.user_rating,
        "currency": blob.restaurant.currency
    }
}
