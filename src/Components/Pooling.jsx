import { useState } from 'react'
import ReactPolling from 'react-polling';

export default function Pooling({ taskId, handleResults }) {
    let url = 'http://localhost:8000/progress/'+taskId
    return (
        <>
            { taskId !== '' &&
                <ReactPolling
                    url={url}
                    interval= {3000} // in milliseconds(ms)
                    retryCount={3} // this is optional
                    onSuccess={(res) => {
                        console.log(res)
                        if (res.task_status === 'Running' && res.images.length == 0) {
                            return true
                        }
                        else if (res.task_status === 'Completed' && res.images.length > 0) {
                            handleResults(res)
                            return false
                        }
                        return true
                        
                    }}
                    onFailure={() => console.log('handle failure')} // this is optional
                    method={'GET'}
                    render={() => { // looks like it is mandatory
                        return (<></>)
                    }}
                />
            }
        </>
    )
}
