import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import ArtisanDashboard from './ArtisanDashboard';
import CustomerDashboard from './CustomerDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'ADMIN') return <AdminDashboard />;
  if (user.role === 'ARTISAN') return <ArtisanDashboard />;
  return <CustomerDashboard />;
}
