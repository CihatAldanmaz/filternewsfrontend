import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TelegramIcon from '@material-ui/icons/Telegram';

const useStyles = makeStyles(theme => ({
  
  card: {
    Width: 300,
    
    maxHeight: 750,
    minHeight: 450,
    marginBottom : '12.25%',
    marginRight : '10.25%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function NewsCard(props) {


  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
 const [lanhadi, setLanhadi] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    
    if(props.favs.includes(props.news.title)){
      setLanhadi(true); 
       }
        else{
          setLanhadi(false);

        } 
         }, []);

 
  
  

  const handleFavClick = (event) => {
    setLanhadi(!lanhadi);
    // console.log("ne ya")
  }

const isFav = () => {
  if(lanhadi){
    return <FavoriteIcon color="secondary" onClick = {handleFavClick} />

  }
  else{
    return <FavoriteIcon  color="default" onClick = {handleFavClick}/>
  }
  }

  // const goWebsite = () => {
    
  // }
  
  
   return (
     <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
        
          </Avatar>
        }
        action={
          <IconButton href={props.news.url} target="_blank" aria-label="settings">
            <TelegramIcon  color={"secondary"}/>
          </IconButton>
        }
        title={props.news.title.slice(0,45).concat("...")}
        subheader={props.news.publishedAt}
      />
      <CardMedia
        className={classes.media}
        image={props.news.urlToImage}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Source : {props.news.source.name}
        </Typography>
        <Typography variant="body3" color="textSecondary" component="p">
        Author : {props.news.author}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"  onClick = {(e) => props.likeToNews(e, props.news)}>
        {isFav()}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>
            {props.news.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}