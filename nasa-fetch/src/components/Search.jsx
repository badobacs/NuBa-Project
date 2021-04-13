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
  const [searchParams, setSearchParams] = useState("");
  /* let searchParams; */
  let dateNow = `${new Date().getFullYear()}-${new Date().getMonth()}-${
    parseInt(new Date().getDate()) - 1
  }`;

  const fetchData = async () => {
    console.log(searchParams);
    if (searchParams) {
      if (parseInt(searchParams.split("-")[0]) > 1995) {
        setLoading(true);
        /*    searchParams = `${parseFloat(year)}-${month}-${day}`;
        console.log(searchParams); */
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=M61W8ZfNGqjP4EzFr49ctgGmgqnjtR5zIf22qVWD&date=${searchParams}`
        );
        console.log(response.status);

        if (response.status === 200) {
          setData(await response.json());
          setLoading(false);
        } else {
          setData(await response.json());
          setLoading(false);
        }
      } else if (searchParams.split("-")[0] < 1996) {
        alert("only select dates after 1996 january 1st!");
      } else if (parseInt(searchParams.split("-")[0]) > 2021) {
        alert("only select dates before March of 2021!");
      }
    }
  };

  useEffect(() => {
    setSearchParams(dateNow);

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div style={{ margin: "1rem" }}>
        <TextField
          required
          disableFuture={true}
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          onBlur={(e) => setSearchParams(e.target.value)}
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
          onClick={() => {
            fetchData();
            setSearchParams("mm-dd-yyyy");
            if (searchParams === "mm-dd-yyyy") {
              alert("search date must be completed");
            }
          }}
          variant="outlined"
          endIcon={<SendIcon />}>
          Search
        </Button>
      </div>
      {loading ? (
        "Loading..."
      ) : data.url ? (
        <div style={{ margin: "1rem" }}>
          {data.title ? <h3>{data.title}</h3> : <h4>No title</h4>}
          {data.media_type === "image" ? (
            <img
              style={{ width: "70vh", height: "auto" }}
              src={data.url}
              alt="nasa search img result is here"
            />
          ) : data.media_type === "video" ? (
            <iframe width="85%" height="360px" title="NASA video" src={data.url}></iframe>
          ) : (
            "we don't know what this is..."
          )}
          <p style={{ margin: "1rem auto" }}>{data.explanation}</p>
        </div>
      ) : (
        <p>{data.msg}</p>
      )}
    </div>
  );
};
