import {API} from "../components/constantManagement"
const fetchData = async (data) => {
    let url = data.url;
    let jwToken = data.jwToken;
    let body = data.body;
    let parameter = data.parameter;
    let method = data.method;
    const requestOptions = {
        method: method==="GET"?"GET":"POST",
        headers: {
          
        },
    };
    if(url!=="/login" && url!=="/student/createStudent" && url!== "/instructor/createInstructor"){
      requestOptions.headers.Authorization = jwToken;
    }
    if(method!=="FORM"&&method!=="GET"){
      requestOptions.headers["Content-Type"] = "application/json"
    }

    if(method === "POST" || method==="FORM"){
      if(method==="POST"){
        requestOptions["body"] = JSON.stringify(body)
      }else{
        requestOptions["body"] = body
      }   
    }else{
        url = url + "?";
        for(let key in parameter){
          url = url + key + "=" + parameter[key] + "&"
        }
        url = url.substring(0,url.length-1);
    }
      //url = /user/createUser
      console.log(url)
      console.log(body)
    return await fetch(`${API}${url}`, requestOptions)
        .then(async (response) => {
          if(response.status == 200){
            return await response.json();
          }else{
            let jsonData = await response.json();
            throw Error(jsonData.errorText)
          } 
        })
        .then((body) => {
          return body
        })
        .catch((err) => {
          return {
            status: false,
            errorMessage: err.message
          }
        });
};

export {fetchData}