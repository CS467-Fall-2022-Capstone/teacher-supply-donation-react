import React from 'react';
import { Vortex } from 'react-loader-spinner';
import { Dimmer, Header } from 'semantic-ui-react';

const Loading = () => {
    return (
        <Dimmer active>
            <Header size='large' inverted>
                Teacher Supply Donation
            </Header>
            <Vortex
                visible={true}
                height='80'
                width='80'
                ariaLabel='vortex-loading'
                wrapperStyle={{}}
                wrapperClass='vortex-wrapper'
                colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
            <Header size='large' inverted>
                Loading...
            </Header>
        </Dimmer>
    );
};

export default Loading;
