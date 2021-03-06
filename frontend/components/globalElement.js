import styled from "styled-components";
import {lightTheme, logoLink} from "./constantManagement"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Validator from "validator";
import {useState,useEffect} from "react";

const ScreenDiv = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.backgroundColor};
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyLogo = styled.img`
  width: ${props => props.width};
`

const DisabledText = styled.p`
  color: ${lightTheme.disabled};
  height: 15px;
  font-size: 0.8em;
  margin-top: 0px;
  margin-bottom: 3px;
`
const ViewImageLink = styled.p`
  font-size: 0.85em;
  cursor: pointer;
  color: ${props => props.color};
  margin: 5px;
`

const isEmail = (email) => {
  return Validator.isEmail(email);
};

const isPass = (pass) => {
  return pass.length >= 8 ? true : false;
};

const isName = (name) => {
  return name.length > 0 ? true : false;
};

const isNumber = (number) => {
  return number > 0 ? true : false;
};

const selectValidator = (type, data) => {
  switch (type) {
    case "email":
      return isEmail(data);
    case "password":
      return isPass(data);
    case "name":
      return isName(data);
    case "text":
      return isName(data);
    case "number":
      return isNumber(data);
    default:
      return true;
  }
};

const SelectField = (props) => {
  const [data, setData] = useState(props.value);
  const handleData = (event) => {
    setData(event.target.value);
    props.handleFunc(event);
  };
  useEffect(() => {
    setData(props.value)
  },[props.value])
  return (
    <TextField
      id={props.id}
      select
      modified={props.modified}
      label={props.label}
      disabled={props.disabled}
      value={data}
      onChange={handleData}
      SelectProps={{
        native: true,
      }}
      InputProps={{
        style: { fontSize: "0.8rem" },
        margin: "dense",        
        disableUnderline: true,
        readOnly: props.disabled === undefined ? false : props.disabled,
      }}
      variant={props.variant !== undefined ? props.variant : "outlined"}
      InputLabelProps={{
        shrink: props.shrink === undefined ? true : props.shrink,
      }}
      size="small"
      helperText={props.helpText}
    >
      { props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
};

const Field = (props) => {
  const [isError, setError] = useState(false);
  const [data, setData] = useState(props.value);
  const [helpText, setHelpText] = useState("");
  const handleData = (event) => {
    setData(event.target.value);
    let error = false;
    if (props.applyValidator === undefined || props.applyValidator) {
      error = !selectValidator(props.type, event.target.value);
      setError(error);
      error ? setHelpText("Invalid Field Data") : setHelpText("");
    }
    props.handleFunc(event, error);
  };
  useEffect(() => {
    setData(props.value)
  },[props.value])
  return (
    <TextField
      id={props.id}
      label={props.label}
      type={props.type}
      fullWidth={true}
      value={data}
      InputProps={{
        style: { fontSize: "0.8rem" },
        margin: "dense",
        disableUnderline: true,
        readOnly: props.disabled === undefined ? false : props.disabled,
      }}
      InputLabelProps={{
        fontSize: "10px",
      }}
      variant={props.variant !== undefined ? props.variant : "outlined"}
      onChange={handleData}
      size="small"
      error={isError}
      helperText={helpText}
    />
  );
};

const SubmitButton = (props) => {
  return (
    <Button
      variant="contained"
      id={props.id}
      disabled={props.disabled !== undefined ? props.disabled : false}
      style={{
        width: "100%",
        height: "30px",
        fontFamily: "Open sans, Raleway, sans-serif",
        fontSize: "0.9rem",
        color: props.color,
        backgroundColor: props.backgroundColor,
      }}
      onClick={props.handleFunc}
    >
      {props.text}
    </Button>
  );
};


export { Row,Col,ScreenDiv,CompanyLogo,DisabledText,ViewImageLink ,SelectField,Field,SubmitButton}