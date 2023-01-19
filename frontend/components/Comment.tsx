import { Box, Grid } from "@mui/material";

interface CommentProperties {
  comment: String;
  userID: String;
  key: number;
  movieTitle: String;
  vote: number;
}

export default function Comment(props: CommentProperties) {
  const { comment, userID, movieTitle, vote } = props;
  console.log(props)
  return (
    <Box
      sx={{
        width: 800,
        backgroundColor: "#d9d9d9 ",
      }}
    >
      <Grid
        container
        sx={{ height: "100%" }}
        alignItems="center"
        spacing={2}
        padding="2%"
      >
        <Grid item xs={8}>
          {comment}
        </Grid>
        <Grid item xs={4}>
          {movieTitle}
          {vote}
        </Grid>
        <Grid item xs={8}>
          {userID}
        </Grid>
      </Grid>
    </Box>
  );
}
