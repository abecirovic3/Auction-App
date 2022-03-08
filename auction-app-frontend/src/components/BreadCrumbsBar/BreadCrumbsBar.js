import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { NavLink } from 'react-router-dom';

import { routes } from 'configuration/RoutesConfig';

import 'assets/style/bread-crumbs-bar.scss';

const BreadCrumbsBar = ({ title }) => {
    const breadCrumbs = useBreadcrumbs(routes);

    return (
        <div className='bread-crumbs-bar-container'>
            <div className='bread-crumbs-bar-content-container'>
                <h1 className='title'>{title}</h1>
                <div className='bread-crumbs-container'>
                    {
                        breadCrumbs.map(
                            ({ match, breadcrumb }, i, data) => (
                                <span key={match.pathname}>
                                    <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                                    {i + 1 !== data.length && <p> &#8594; </p>}
                                </span>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default BreadCrumbsBar;