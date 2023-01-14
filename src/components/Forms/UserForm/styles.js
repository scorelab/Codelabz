import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 20,
    boxShadow: "none",
    padding: "20px 30px",
    border: "1px solid #e8e8e8",
    borderRadius: 15,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    "@media (min-width:0px) and (max-width:959px)": {
      justifyContent: "center",
      alignItems: "center",
    }
  },
  inputFields: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.between("xs", "sm")]: {
      display: 'block',
      margin: 'auto'
    },
    [theme.breakpoints.up("sm")]: {
      display: 'flex'
    },
    "@media (min-width:600px) and (max-width:749px)": {
      display: 'block',
      margin: 'auto'
    },
    "@media (min-width:750px)": {
      display: 'flex',
    },

  },
  socialFields: {
    marginBottom: "15px",
    marginLeft: "3px !important",
    "@media (max-width:749px)": {
      width: "462px !important"
    },
    "@media (max-width:599px)": {
      width: "422px !important"
    },
    "@media (max-width:559px)": {
      width: "390px !important"
    },
    "@media (max-width:464px)": {
      width: "290px !important"
    },
    "@media (max-width:349px)": {
      width: "240px !important"
    },
    "@media (min-width:750px) and (max-width:959px)": {
      width: "590px !important",
    },
  },
  input: {
    "& input": {
      padding: "18px !important",
      "@media (min-width:0px) and (max-width:290px)": {
        margin: 'auto',
        width: "140px !important"
      },
      "@media (min-width:300px) and (max-width:349px)": {
        margin: 'auto',
        width: "190px !important"
      },
      "@media (min-width:350px) and (max-width:464px)": {
        margin: 'auto',
        width: "245px !important"
      },
      "@media (min-width:465px) and (max-width:549px)": {
        margin: 'auto',
        width: "350px !important"
      },
      "@media (min-width:550px) and (max-width:559px)": {
        margin: 'auto',
        width: "350px !important"
      },
      "@media (min-width:560px) and (max-width:599px)": {
        margin: 'auto',
        width: "380px !important"
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: "300px !important",
      },
      "@media (min-width:600px) and (max-width:750px)": {
        width: "420px !important"
      },
      "@media (min-width:750px) and (max-width:895px)": {
        width: "250px !important",
        marginRight: "10px"
      },
      "@media (min-width:896px) and (max-width:959px)": {
        width: "250px !important",
        marginRight: "10px"
      },
      [theme.breakpoints.up("md")]: {
        width: "200px !important",
      },
      "@media (min-width:960px) and (max-width:960px)": {
        width: "270px !important"
      },
      "@media (min-width:1100px) and (max-width:1279px)": {
        width: "240px !important"
      },
      [theme.breakpoints.up("lg")]: {
        width: "350px !important",
      },

    }
  },
  inputBox: {
    marginBottom: '20px',
  },
  descBox: {
    [theme.breakpoints.up("lg")]: {
      marginRight: "-4px !important"
    },
    "@media (min-width:900px) and (max-width:1099px)": {
      width: "90px !important",
      marginRight: "140px !important"
    },
    "@media (min-width:960px) and (max-width:960px)": {
      marginRight: "213px !important"
    },
    "@media (min-width:900px) and (max-width:959px)": {
      marginRight: "190px !important"
    },
    "@media (min-width:700px) and (max-width:899px)": {
      marginRight: "-15px !important"
    },
  },
  select: {
    [theme.breakpoints.between("xs", "sm")]: {
      width: '230px'
    },
    "@media (min-width:0px) and (max-width:290px)": {
      margin: 'auto',
      width: "150px !important"
    },
    "@media (min-width:350px) and (max-width:464px)": {
      margin: 'auto',
      width: "284px !important"
    },
    "@media (min-width:465px) and (max-width:549px)": {
      margin: 'auto',
      width: "385px !important"
    },
    "@media (min-width:550px) and (max-width:559px)": {
      margin: 'auto',
      width: "390px !important"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "350px !important",
    },
    "@media (min-width:560px) and (max-width:749px)": {
      margin: 'auto',
      width: "420px !important"
    },
    "@media (min-width:600px) and (max-width:750px)": {
      width: "454px !important"
    },
    "@media (min-width:750px) and (max-width:895px)": {
      width: "285px !important"
    },
    "@media (min-width:896px) and (max-width:959px)": {
      width: "275px !important",
    },
    [theme.breakpoints.up("md")]: {
      width: "230px !important",
    },
    "@media (min-width:960px) and (max-width:960px)": {
      width: "305px !important"
    },
    "@media (min-width:1100px) and (max-width:1279px)": {
      width: "278px !important"
    },
    [theme.breakpoints.up("lg")]: {
      width: "380px !important",
    },
  },
  fb: {
    fontSize: 31,
    color: "#1877F2",
    marginRight: 4,
    "@media (max-width: 500px)": {
      marginRight: 7,
      fontSize: 24,
    },
  },
  tw: {
    color: "#03A9F4",
    fontSize: 30,
    marginRight: 5,
    "@media (max-width: 500px)": {
      marginRight: 6,
      fontSize: 23,
    },
  },
  li: {
    color: "#0077b5",
    fontSize: 31,
    marginRight: 5,
    "@media (max-width: 500px)": {
      marginRight: 6,
      fontSize: 23,
    },
  },
  git: {
    fontSize: 26,
    marginRight: 7,
    marginLeft: 3,
    "@media (max-width: 500px)": {
      marginRight: 7,
      fontSize: 19,
    },
  },
}));

export default useStyles;
