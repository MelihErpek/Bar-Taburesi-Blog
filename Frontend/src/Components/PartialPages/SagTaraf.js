import React from 'react'
import { TwitterFollowButton } from 'react-twitter-embed';

export default function SagTaraf() {


    return (
        <div >
            <div style={{marginLeft:50}}>
                <TwitterFollowButton
                    options={{size: 'large'}}
                    screenName={'BarTaburesiBlog'}
                />
            </div>
        </div>

    )

}
