import { useStore } from '@nanostores/react';
import Form from './DashboardForm';
import Gallery from './DashboardGallery';
import { serverReachableStore } from './store';

export function Dashboard(props) {
  serverReachableStore.set(props.serverReachable)
  const $serverReachableStore = useStore(serverReachableStore);

  return (
    <>
      {$serverReachableStore ? 
        <div className="m-5">
          <Form serverURL={props.serverURL}/>
          <Gallery />
        </div>
         : 
        <p className="flex items-center justify-center h-[80vh]">
          Backend server is not reachable on&nbsp;<strong>{props.serverURL == null ? null: props.serverURL}</strong> 
        </p>
      }
    </>
  )
}