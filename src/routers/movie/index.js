export default {
    path: '/movie',
    component: () => import('@/views/Movie/index'),
    children: [
        {
            path: 'city',
            component: () => import('@/components/movie/City')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/movie/NowPlaying')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/movie/ComingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/movie/Search')
        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }
    ]
}