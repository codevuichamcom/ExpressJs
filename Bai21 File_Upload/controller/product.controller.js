var db = require("../db");

module.exports.index = function (req, res) {
    var page =parseInt(req.query.page) || 1;
    var perPage = 8;

    var start = (page-1)*perPage;
    var end = page*perPage;

    // var drop = (page-1)*perPage;

    var numPages=[];
    var numProducts = db.get('products').value().length;
    var pageCount = (numProducts%perPage===0)?numProducts/perPage:numProducts/perPage+1;
    for(var i=1;i<pageCount;i++){
        numPages.push(i);
    }

    res.render("products/index",{
        //phan trang bang code
        numPages:numPages,
        page:page,
        products: db.get('products').value().slice(start,end)
        // products: db.get('products').drop(drop).take(perPage).value() //phan trang bang db
    });
};
