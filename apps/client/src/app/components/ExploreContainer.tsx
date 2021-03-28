import { IonButton, IonSpinner } from '@ionic/react';
import React from 'react';
import './ExploreContainer.css';
import { gql, useQuery } from '@apollo/client';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ContainerProps {}

const query = gql`
  query ping {
    ping
  }
`;

const ExploreContainer: React.FC<ContainerProps> = () => {
  const ping = useQuery<{ ping: boolean }>(query);

  if (ping.error) {
    return (
      <div>
        <pre>{JSON.stringify(ping.error, null, 2)}</pre>
      </div>
    );
  }

  if (ping.loading) {
    return <IonSpinner />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      PING: {JSON.stringify(ping.data.ping)}
      <IonButton>New Player</IonButton>
    </div>
  );
};

export default ExploreContainer;
