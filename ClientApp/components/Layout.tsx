import * as React from 'react';
import { NavMenu } from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='columns'>
            <div className='column is-one-quarter'>
                <NavMenu />
            </div>
            <div className='column is-three-quarters'>
                <section className='section'>
                    {this.props.children}
                </section>
            </div>
        </div>;
    }
}
