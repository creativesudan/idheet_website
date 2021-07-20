const lazyLoad = (action) => {
    return { ...action, lazyLoad: true }
}

export default lazyLoad;