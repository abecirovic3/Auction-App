const DynamicSearchBreadcrumb = ({ match }) => (
    <span>Search result for {match.params.search}</span>
);

export const routes = [
    { path: '/', breadcrumb: 'Home' },
    { path: '/privacy', breadcrumb: 'Privacy and Policy' },
    { path: '/terms', breadcrumb: 'Terms and Conditions' },
    { path: '/about', breadcrumb: 'About Us' },
    { path: '/shop', breadcrumb: 'Shop' },
    { path: '/shop/product-overview', breadcrumb: null },
    { path: '/shop/product-overview/:id', breadcrumb: 'Single product' },
    { path: '/shop/search', breadcrumb: null },
    { path: 'shop/search/:search', breadcrumb: DynamicSearchBreadcrumb },
    { path: '/account', breadcrumb: 'My Account' },
];