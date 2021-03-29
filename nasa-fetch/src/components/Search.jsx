import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const Search = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let searchParams;
  let dateNow = `${new Date().getFullYear()}-${new Date().getMonth()}-${
    parseInt(new Date().getDate()) - 1
  }`;

  const fetchData = async () => {
    console.log(searchParams);
    if (
      parseInt(searchParams.split("-")[0]) > 1995 &&
      parseInt(searchParams.split("-")[0]) + parseInt(searchParams.split("-")[1]) <= 2024
    ) {
      setLoading(true);
      /*    searchParams = `${parseFloat(year)}-${month}-${day}`;
      console.log(searchParams); */
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=M61W8ZfNGqjP4EzFr49ctgGmgqnjtR5zIf22qVWD&date=${searchParams}`
      );
      setData(await response.json());

      if (data) {
        setLoading(false);
        console.log(await data);
      }
    } else if (searchParams.split("-")[0] < 1996) {
      alert("only select dates after 1996 january 1st!");
    } else if (
      parseInt(searchParams.split("-")[0]) + parseInt(searchParams.split("-")[1]) >
      2024
    ) {
      alert("only select dates before March of 2021!");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchParams = dateNow;

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <TextField
          required
          disableFuture={true}
          onChange={(e) => (searchParams = e.target.value)}
          onBlur={(e) => (searchParams = e.target.value)}
          id="date"
          label="Choose a Date"
          type="date"
          /* defaultValue="1996-05-24" */
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          style={{ margin: "1rem" }}
          onClick={() => fetchData()}
          variant="outlined"
          endIcon={<SendIcon />}>
          Search
        </Button>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <div style={{ margin: "1rem" }}>
          {data.title ? <h3>{data.title}</h3> : <h4>No title</h4>}
          <img src={data.url} alt="nasa search img result is here" />
          <p>{data.explanation}</p>
        </div>
      )}
    </div>
  );
};
