import React, { useState, useEffect, Fragment } from "react";
import PinField from "react-pin-field";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ReactJson from "react-json-view";
import Game24DataService from "../services/Game24DataService";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "input::-webkit-inner-spin-button, input::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
  root: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "max-content",
    gridColumnGap: "10px",
    justifyContent: "center",
    margin: "64px 0",
    padding: 20,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  inputPin: {
    width: "75px",
    height: "75px",
    fontSize: "40px",
    textAlign: "center",
    outline: "none",
    borderRadius: "5px",
    border: "1px solid #d3d3d3",
    transitionProperty: "color,border,box-shadow,transform",
    transitionDuration: ".25s",
    margin: "auto 10px",
  },
}));

export default function Game24() {
  const classes = useStyles();
  const [inputNumber, setInputNumber] = useState("");
  const [inputCompleted, setInputCompleted] = useState(false);
  const [message, setMessage] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (inputCompleted) {
      calculateGame24Result();
    }
  }, [inputNumber, inputCompleted]); // eslint-disable-line react-hooks/exhaustive-deps

  const pinFieldProps = {
    ref: { current: [] },
    length: 4,
    validate: "123456789",
  };

  const calculateGame24Result = () => {
    const numbers = inputNumber.split("");
    Game24DataService.calculateGame24Result(numbers)
      .then((response) => {
        const res = response.data;
        if (res && res.success) {
          setMessage(
            `YES = ตัวเลขที่ใส่สามารถคำนวนออกมาได้จำนวน 24 มีทั้งหมด ${res.toDo.length} วิธี`
          );
          setResults(res);
        } else {
          setMessage(`NO = ตัวเลขที่ใส่ไม่สามารถคำนวนออกมาได้จำนวน 24`);
          setResults([]);
        }
        setInputCompleted(false);
      })
      .catch((e) => {
        setInputCompleted(false);
        console.log(e);
      });
  };

  return (
    <Fragment>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Game 24
          </Typography>
          <Typography
            component="h6"
            variant="h6"
            align="center"
            color="textPrimary"
            gutterBottom
          >
             ใส่ตัวเลขทั้ง 4 ช่อง เราจะแสดงวิธีคำนวนให้ผลลัพท์ออกมาได้ 24
          </Typography>
          <Paper component="div" className={classes.root}>
            <PinField
              className={classes.inputPin}
              {...pinFieldProps}
              onChange={setInputNumber}
              onComplete={() => setInputCompleted(true)}
            />
          </Paper>
           {message}
          <ReactJson
            src={results.toDo}
            displayObjectSize={false}
            displayDataTypes={false}
          />
        </Container>
      </div>
    </Fragment>
  );
}
