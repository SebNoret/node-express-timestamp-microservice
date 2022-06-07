class DateHandler{


     static urlParamTester(urlParam){
      // if url param is a timestamp
      const timestampRegex= /^\d+$/;
      if(timestampRegex.test(urlParam)){
          return urlParam
      }
    
      // if url param is not a valid date string
      const dateParam= new Date(urlParam)  
      if(isNaN(dateParam))throw new Error("Invalid Date")
    
      // url param is a valid date string
      return urlParam
    }


    dateFormater(urlParam){
     
      const tsToDate= new   Date(parseInt(urlParam)).toUTCString();
      return {
       unix: Number(urlParam),
       utc: tsToDate
      }
    }
    timestampFormater(urlParam){
      const dateString= new Date(urlParam).toUTCString();
      const tsString= Date.parse(dateString);
      return{
        unix: Number(tsString),
        utc: dateString
      }
    }
    static getDateFromUrlParam(urlParam){
    
      // format for timestamp string param
      const timestampRegex= /^\d+$/;
      if(timestampRegex.test(urlParam)) return this.dateFormater(urlParam)
      //format for date string param
      return this.timestampFormater(urlParam)
    }

     static getCurrentTime(){
      
      const current = Date.now();
      const utc= new Date(current).toUTCString()
      
      return {
        unix: Number(current),
        utc: utc
      }
    }


}


module.exports=DateHandler