import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import PublicIcon from '@material-ui/icons/Public';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import HealingIcon from '@material-ui/icons/Healing';
import TheatersIcon from '@material-ui/icons/Theaters';

const drawerWidth = 220;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    
  },

styles : {
    paper: {
      background: "blue"
    }
  },
  
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      
      
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "inherit"
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function CategoryList(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        
          <ListItem  onClick = {props.fetchNewsApi} button key={"Latest News"}>
            <ListItemIcon><RssFeedIcon /></ListItemIcon>
            <ListItemText primary={"Latest News"} />
          </ListItem>


          <ListItem onClick = {props.submitScienceNews} button key={"science"}>
            <ListItemIcon><HourglassEmptyIcon /></ListItemIcon>
            
            
            <ListItemText primary={"SCIENCE"} />
          </ListItem>

          <ListItem onClick = {props.submitBusinessNews} button key={"BUSINESS"}>
            <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
            <ListItemText primary={"BUSINESS"} />
          </ListItem>

          <ListItem onClick = {props.submitSportNews} button key={"SPORTS"}>
            <ListItemIcon><SportsFootballIcon /></ListItemIcon>
            <ListItemText primary={"SPORTS"} />
          </ListItem>

          <ListItem onClick = {props.submitTechNews} button key={"TECH"}>
            <ListItemIcon><ScatterPlotIcon /></ListItemIcon>
            <ListItemText primary={"TECH"} />
          </ListItem>

          <ListItem onClick = {props.submitHealthNews} button key={"Health"}>
            <ListItemIcon><HealingIcon /></ListItemIcon>
            <ListItemText primary={"Health"} />
          </ListItem>

          <ListItem onClick = {props.submitEntertainment} button key={"entertainment"}>
            <ListItemIcon><TheatersIcon /></ListItemIcon>
            <ListItemText primary={"entertainment"} />
          </ListItem>

          <ListItem button key={"MY FAVORITES"}>
            <ListItemIcon><FavoriteIcon /></ListItemIcon>
            <ListItemText primary={"MY FAVORITES"} />
          </ListItem>
          
        
      </List>
      <Divider />
    
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <nav className={classes.drawer} aria-label="mailbox folders" >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer 
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
              
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
     
    </div>
  );
}

CategoryList.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default CategoryList;