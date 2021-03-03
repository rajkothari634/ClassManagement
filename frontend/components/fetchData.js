import {API} from "../components/constantManagement"
const fetchData = async (data) => {
    let method = data.method;
    let url = data.url;
    let jwToken = data.jwToken;
    let body = data.body;
    let parameter = data.parameter;

    const requestOptions = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
    };
    if(url!=="/login" && url!=="/student/createStudent" && url!== "/instructor/createInstructor"){
      requestOptions.headers.Authorization = jwToken;
    }

    if(method === "POST"){
          requestOptions["body"] = JSON.stringify(body)
    }else{
        url = url + "?";
        for(let key in parameter){
          url = url + key + "&"
        }
        url = url.substring(0,url.length-1);
    }
      //url = /user/createUser
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