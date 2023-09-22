import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';

@Component({
  templateUrl: 'coreui-icons.component.html',
  providers: [IconSetService],
})
export class CoreUIIconsComponent implements OnInit {
   
  public icons!: [string, string[]][];

  constructor(
    private route: ActivatedRoute, public iconSet: IconSetService
  ) {
    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  ngOnInit() {
     
  }

  toKebabCase(str: string) {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }

  getIconsView(prefix: string) {
    return Object.entries(this.iconSet.icons).filter((icon) => {
      return icon[0].startsWith(prefix);
    });
  }
}
