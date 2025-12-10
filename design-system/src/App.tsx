import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from './components/atoms/Button/Button';
import { SegmentedControl } from './components/molecules/SegmentedControl/SegmentedControl';
import { CollapsibleSideNav } from './components/organisms/Navigation/CollapsibleSideNav';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '2rem' }}>
        <h1>Syncrofy Design System</h1>
        <p>Design system based on Material UI</p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Button variant="contained">Contained Button</Button>
          <Button variant="outlined">Outlined Button</Button>
          <Button variant="text">Text Button</Button>
          <Button variant="contained" size="small">Small Contained</Button>
          <Button variant="outlined" size="small">Small Outlined</Button>
          <Button variant="contained" size="large">Large Contained</Button>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>Segmented Control</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SegmentedControl
              items={[
                { id: 'option1', text: 'Option 1' },
                { id: 'option2', text: 'Option 2' },
                { id: 'option3', text: 'Option 3' },
              ]}
              defaultSelectedId="option1"
              onChange={(id) => console.log('Selected:', id)}
            />

            <SegmentedControl
              items={[
                { id: 'favorites', text: 'Favorites', icon: <FavoriteIcon fontSize="small" /> },
                { id: 'stars', text: 'Stars', icon: <StarIcon fontSize="small" /> },
              ]}
              defaultSelectedId="favorites"
              onChange={(id) => console.log('Selected:', id)}
            />

            <SegmentedControl
              items={[
                { id: 'small1', text: 'Small 1' },
                { id: 'small2', text: 'Small 2' },
              ]}
              size="sm"
              defaultSelectedId="small1"
              onChange={(id) => console.log('Selected:', id)}
            />
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', height: '400px' }}>
          <CollapsibleSideNav
            items={[
              { id: 'home', label: 'Home', icon: <HomeIcon /> },
              { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
            ]}
            selectedItemId="home"
            expanded={true}
            onItemSelect={(id) => console.log('Selected nav item:', id)}
            onExpandedChange={(expanded) => console.log('Expanded changed:', expanded)}
          />
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f9f9f9' }}>
            <h3>Collapsible Side Navigation Demo</h3>
            <p>The navigation sidebar can be expanded/collapsed with smooth animations.</p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

