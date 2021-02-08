import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadAPI: Promise<any>;

  constructor() { }

  ngOnInit(): void {
    this.loadAPI = new Promise((resolve) => {
      // this.loadScript();
      resolve(true);
    });
  }

  public  loadScript() {
    let isFound = false;
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const dynamicScripts = [
        'assets/assets/external/jquery.min.js',
        'assets/assets/external/jquery.easing-1.3.pack.js',
        'assets/assets/external/bootstrap/js/bootstrap.min.js',
        'assets/assets/external/scroll.js',
        'assets/assets/external/magnific-popup/jquery.magnific-popup.min.js',
        'assets/assets/external/isotope.pkgd.min.js',
        'assets/assets/external/metisMenu/metisMenu.js',
        'assets/assets/theme/js/theme.js',
        'assets/assets/external/gmap3.min.js',
        'assets/assets/theme/js/map.js',
      ];

      for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);
      }
    }
  }
}
