import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      width: "100%",
      marginTop: "10px",
      marginBottom: "10px",
    },
  },
}));

export default function InputField({setTaskItem, handleTaskItem}) {
  const classes = useStyles();

  

  return (
    <form
      onSubmit={handleTaskItem}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={(event) => {
          setTaskItem(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleTaskItem();
            event.target.value = "";
          }
        }}
        name="text"
        id="outlined-basic"
        label="Add A Task"
        variant="outlined"
      />
    </form>
  );
}