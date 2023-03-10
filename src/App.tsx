import React, {lazy,Suspense, useState} from 'react'
// import './app.scss'

import oneImg from './assets/images/one.png';
import fiveImg from './assets/images/five.jpg';

const LazyDemo = lazy(() => import('@/components/LazyDemo'))


/* webpackChunkName: "my-chunk-name" */ // 资源打包后的文件chunkname
/* webpackPrefetch: true */ // 开启prefetch预获取
/* webpackPreload: true */ // 开启preload预获取
const PreFetchDemo = lazy(() => import(
    /* webpackChunkName: "PreFetchDemo" */
    /*webpackPrefetch: true*/
    '@/components/PreFetchDemo'
    ))
const PreloadDemo = lazy(() => import(
    /* webpackChunkName: "PreloadDemo" */
    /*webpackPreload: true*/
    '@/components/PreloadDemo'
    ))
function App() {
    const [count, setCounts] = useState('')
    const onChange = (e: any) => {
        setCounts(e.target.value)
    }

    const [show, setShow] = useState(false)
    // 点击事件中动态引入css, 设置show为true
    const onClick = () => {
        import('@/app.scss')
        setShow(true)
    }

    return (
        <>
            {/* <img src={oneImg} alt=""  />
        <img src={fiveImg} alt=""  />
        <h2>webpack5-react-ts</h2> */}
            {/*<h2>修改一下</h2>*/}
            {/*<p>受控组件</p>*/}
            {/*<input type="text" value={count} />*/}
            {/*<br/>*/}
            {/*<p>非受控组件</p>*/}
            {/*<input type="text" onChange={onChange}/>*/}



            {/*<h2 onClick={onClick}>展示</h2>*/}
            {/*/!* show为true时加载LazyDemo组件 *!/*/}
            {/*{ show && <Suspense fallback={null}><LazyDemo /></Suspense> }*/}
            <h2 onClick={onClick}>展示</h2>
            {/* show为true时加载组件 */}
            { show && (
                <>
                    <Suspense fallback={null}><PreloadDemo /></Suspense>
                    <Suspense fallback={null}><PreFetchDemo /></Suspense>
                </>
            ) }
        </>
    )

}

export default App
