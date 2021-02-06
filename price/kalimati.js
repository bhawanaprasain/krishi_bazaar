const cherio = require("cherio")
const request  = require("request")


const websiteURL = "https://kalimatimarket.gov.np/price"
const getWebsiteContent = async (websiteURL)=>{
    request
    (websiteURL,(error,response, html)=>{
        if(!error && response.statusCode==200){
            const $ = cherio.load(html);
            console.log($);
            // /html/body/div[2]/main/div/div/div/div[2]/div/div/div/table/tbody
            // const intro = $("#commodityDailyPrice > tbody")
            // console.log(intro.html())
            $("tr").each((i,el)=>{
                console.log($(el).text());
                console.log(i);
            })
        }
    })
}
 getWebsiteContent(websiteURL)