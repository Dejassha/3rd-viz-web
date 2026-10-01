import { NextResponse } from 'next/server';

import webDevelopment from '../../services/_data/services/development-and-software/web-development';
import appDevelopment from '../../services/_data/services/development-and-software/app-development';
import digitalMarketing from '../../services/_data/services/development-and-software/digital-marketing';
import gameDevelopment from '../../services/_data/services/development-and-software/game-development';

import crm from '../../services/_data/services/data-and-cloud/customer-relationship-management';
import erp from '../../services/_data/services/data-and-cloud/enterprise-resource-planning';
import iam from '../../services/_data/services/data-and-cloud/identity-and-access-management';
import serverManagement from '../../services/_data/services/data-and-cloud/server-management';

import threeDServices from '../../services/_data/services/immersive-tech/3d-services';
import augmentedReality from '../../services/_data/services/immersive-tech/augmented-reality';
import virtualReality from '../../services/_data/services/immersive-tech/virtual-reality';

export async function GET() {
  const services = [
    { category: 'development-and-software', slug: 'web-development', data: webDevelopment },
    { category: 'development-and-software', slug: 'app-development', data: appDevelopment },
    { category: 'development-and-software', slug: 'digital-marketing', data: digitalMarketing },
    { category: 'development-and-software', slug: 'game-development', data: gameDevelopment },
    { category: 'data-and-cloud', slug: 'customer-relationship-management', data: crm },
    { category: 'data-and-cloud', slug: 'enterprise-resource-planning', data: erp },
    { category: 'data-and-cloud', slug: 'identity-and-access-management', data: iam },
    { category: 'data-and-cloud', slug: 'server-management', data: serverManagement },
    { category: 'immersive-tech', slug: '3d-services', data: threeDServices },
    { category: 'immersive-tech', slug: 'augmented-reality', data: augmentedReality },
    { category: 'immersive-tech', slug: 'virtual-reality', data: virtualReality }
  ];

  return NextResponse.json(services);
}
