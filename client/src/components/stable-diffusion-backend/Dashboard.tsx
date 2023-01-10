import { useStore } from '@nanostores/react';
import Form from './DashboardForm';
import Gallery from './DashboardGallery';
import { serverReachableStore } from './store';

export function Dashboard(props: {serverReachable: boolean, serverURLSSR: string, serverURLClient: string}) {
  serverReachableStore.set(props.serverReachable)
  const $serverReachableStore = useStore(serverReachableStore);

  return (
    <>
      {$serverReachableStore ? 
        <div className="flex flex-row flex-wrap md:flex-nowrap gap-4 m-4">
          <div className="flex-none">
            <Form serverURL={props.serverURLClient}/>
          </div>
          <div className='flex-auto'>
            <Gallery />
          </div>
        </div>
         : 
        <p className="flex items-center justify-center h-[80vh]">
          Backend server is not reachable on&nbsp;<strong>{props.serverURLSSR == null || props.serverURLSSR == "" ? "undefined, env variable is missing or it's empty": props.serverURLSSR}</strong> 
        </p>
      }
    </>
  )
}