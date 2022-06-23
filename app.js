const eXpress = require("express")

const bodyParser = require("body-parser")

const reQuest = require("request")

const https = require("https")

 app = eXpress()

 app.use(bodyParser.urlencoded({extended: true})) // data Post form fetch krny mn use hota

app.use(eXpress.static("public"))    // it fetches stattic files jo k hamary custom css or images h jo folder se pick karega

app.get("/", function (req, res) {
res.sendFile(__dirname + "/signup.html")    
})

app.post("/", function (req, res) {

    const frst = req.body.first     // constant mn values lerhy signup ki
    const lst = req.body.last
    const eml = req.body.email

    const data = {                     // signup ki value ko Api k members k through constant data mn lieliya
        members: [{
            email_address: eml,
            status:"subscribed",
            merge_fields:{
                FNAME: frst ,
                LNAME: lst
            }       
       } ]
    };

    const jsonData = JSON.stringify(data);    /* phr stringif k through data compact kr liya*/

    url = "https://us17.api.mailchimp.com/3.0/lists/ee0a191f94";

    const options = {                                              // ye post or authetication k liye Api ki guidelines k through//
            method: "POST",
            auth: "Bilal:df940e56de8e06b836fc097770e45001-us17"
        }

    const request = https.request(url, options , function (response) {      // constant options ko leliya us k through post krdya //
        if(response.statusCode === 200){
          res.sendFile(__dirname + "/success.html" )        // "node.js" k request method through jis mn "url" or "options" le skty//
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    } )
    
    request.write(jsonData )
    request.end()
})

app.post("/failure", function (req, res) {
    res.redirect("/")    
})

app.listen(process.env.PORT || 3000, function () {      
    console.log("server is running on port 3000");     // process.env.POST heroku k lye use hota woh apny hisab se port dega is lye 3000 port use hga
})



// df940e56de8e06b836fc097770e45001-us17

//id
// ee0a191f94