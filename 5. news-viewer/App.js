import { Nav, NewsList } from './components/index.js';

const $root = [...document.querySelectorAll('#root')];

for(let i = 0; i < $root.length; i++) {
    const newsListDOM = new NewsList;
    const navDOM = new Nav; 
    $root[i].appendChild(navDOM);
    $root[i].appendChild(newsListDOM);
    
    newsListDOM.updateNewsList(newsListDOM.category, newsListDOM.page, newsListDOM.size)

    
    const newsListDOMProxy = new Proxy(newsListDOM, {
        set: (object, property, value) => {
            object[property] = value;
            return true;
        }, 
        
        get: (object, property) => {
            return object[property];
        }
    });

    navDOM.addEventListener ('click', event => {
        if ([...event.target.classList].includes('category-item')) {
            navDOM.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
            newsListDOM.clearNewsList();
            newsListDOMProxy.category = event.target.id;
            newsListDOMProxy.page = 1;
            let $cateogry = newsListDOMProxy['category'];
            let $pg = newsListDOMProxy['page'];
            let $sz = newsListDOMProxy['size'];
            newsListDOMProxy.updateNewsList($cateogry, $pg, $sz);
            morePages();
        }
    });

    function morePages() {
        const scrollObserver = $root[i].querySelector('.scroll-observer'); 
        const options = { root: null, rootMargin: '0px', threshold: 0.5 };
    
        const io = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio === 1) return;
            if (entries[0].isIntersecting) {
                newsListDOMProxy.page++;
                let $cateogry = newsListDOMProxy['category'];
                let $pg = newsListDOMProxy['page'];
                let $sz = newsListDOMProxy['size'];
                newsListDOMProxy.updateNewsList($cateogry, $pg, $sz);
            }
        }, options);
        
        io.observe(scrollObserver);
    }

    morePages();
}

