import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 400,
  },
});

export default function ProductCard({ title, brand, price, img}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
        />
        <CardContent>
          <Typography variant="body2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {brand}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {"Rs."+price+"/-"}
        </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to wishlist">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share item">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onMouseEnter={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show details"
        >
          <Tooltip title="details" className={styles1.child2}>
            Show More
      </Tooltip>
          <ExpandMoreIcon />
        </IconButton>

      </CardActions>
    </Card>
  );
}