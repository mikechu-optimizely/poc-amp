import { createInstance } from '@optimizely/optimizely-sdk'

export const config = { amp: true }

const date = new Date('2021-04-11T00:37:33.809Z')

export const getServerSideProps = async () => {
  const optimizelyClient = createInstance({ sdkKey: 'Me5Kkzsc9FtbLrtvKJRSq' })
  await optimizelyClient.onReady()

  const userId = Math.random().toString(36).substring(7)
  const user = optimizelyClient.createUserContext(userId)

  const decision = user.decide('product_sort')
  // console.log('decision', decision)

  return {
    props: {
      decision: {
        enabled: decision.enabled,
        variationKey: decision.variationKey,
        variables: decision.variables,
        userId: decision.userContext.userId,
      }
    }
  }
}

function Index({ decision }) {
  return (
    <>
      <h1>AMP Example</h1>
      <h2>Optimizely Decisions</h2>
      {decision &&
        <p> {
          `For user ${decision.userId} the flag is ${decision.variationKey} with products sorted ${decision.variables['sort_method']}`
        }
        </p>
      }
      <h2>Regular AMP Timeago Component</h2>
      <div>
        <p>Some time: {date.toJSON()}</p>
        <amp-timeago
          width="0"
          height="15"
          datetime={date.toJSON()}
          layout="responsive"
        >.
        </amp-timeago>
      </div>
    </>
  )
}

export default Index