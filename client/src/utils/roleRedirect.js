export const getRedirectPathByRole = (role) => {
    switch (role) {
      case 'citizen':
        return '/dashboard/citizen';
      case 'agency':
        return '/dashboard/agency';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/login';
    }
  };
  