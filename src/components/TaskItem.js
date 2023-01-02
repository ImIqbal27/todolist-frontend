import { FormControlLabel, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import DeleteModal from "./DeleteModal.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    boxShadow: "none",
    height: "50px",
    display: "flex",
    color: theme.palette.text.secondary,
    alignItems: "center",
  },
}));
const TaskItem = ({
  item,
  handleUpdate,
  handleDelete,
  setRefresh,
  refresh,
  
}) => {
  console.log(item);
  const [open, setOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const handleEdit = () => {
    setEditable(!editable);
  };
  const handleTaskUpdate = (id, name) => {
    console.log(id, name);
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setEditable(!editable);
          setRefresh(!refresh);
        }
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      style={{
        marginTop: "10px",
        marginBottom: "10px",
        padding: "10px",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        borderRadius: "3px",
      }}
    >
      <Grid style={{ alignItems: "center" }}>
        <Paper className={classes.paper}>
          {editable ? (
            <TextField
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTaskUpdate(item?._id, e.target.value);
                }
              }}
              defaultValue={item?.name}
              id="outlined-basic"
              label="Enter Task name"
              variant="outlined"
            />
          ) : (
            <FormControlLabel
              checked={item?.isChecked}
              onChange={() => handleUpdate(item?._id)}
              control={<Checkbox name="checkedA" />}
              label={item?.name}
            />
          )}
        </Paper>
      </Grid>
      <Grid>
        <Button
          onClick={handleEdit}
          style={{ marginRight: "5px" }}
          color="primary"
        >
          EDIT
        </Button>


        <Button onClick={handleClickOpen} color="primary">
          DELETE
        </Button>

        <DeleteModal
          key={item?._id}
          handleClose={handleClose}
          item={item}
          handleDelete={handleDelete}
          setOpen={setOpen}
          open={open}
          handleClickOpen={handleClickOpen}
        ></DeleteModal>
      </Grid>
    </Grid>
  );
};

export default TaskItem;
