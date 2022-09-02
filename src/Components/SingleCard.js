import { Card, CardMedia, CardContent, Typography, Grid} from "@mui/material"

const SingleCard = ({prod, creat, img}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card sx={{ maxWidth: 345, minHeight : 450 }}>
      <CardMedia
        component="img"
        height="250"
        image={img ? img : "assets/images/No-image.png"}
        alt="green iguana"
      />
      <CardContent>
        <Typography variant="p" >
          {creat}
        </Typography>
        <Typography gutterBottom variant="h5" component="h5">
          {prod}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
    </Card>
    </Grid>
  )
}

export default SingleCard