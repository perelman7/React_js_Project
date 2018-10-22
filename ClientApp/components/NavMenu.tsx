import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <aside className='menu'>
            <Link className='menu-label' to={'/'}>ReactProject</Link>
            <section className='section'>
                <ul className='menu-list'>
                    <li>
                        <NavLink to={'/'} exact activeClassName='active'>
                            <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/counter'} activeClassName='active'>
                            <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/fetchdata'} activeClassName='active'>
                            <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/phones'} activeClassName='active'>
                            <span className='glyphicon glyphicon-th-list'></span> Phones
                            </NavLink>
                    </li>
                </ul>
            </section>

        </aside>;
    }
}
