import { Img } from "react-image";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

// svg files
import NoImage from "../assets/images/no-image-available.svg";

const BasicImage = (src, alt) => {
  return (
    <Img
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "8px",
      }}
      src={src}
      alt={alt}
      className="org-image"
      loader={
        <Box mt="40%" mb="40%">
          <center>
            <CircularProgress
              style={{
                color: "#455a64",
              }}
            />
          </center>
        </Box>
      }
    />
  );
};

export { BasicImage };
export { NoImage };
