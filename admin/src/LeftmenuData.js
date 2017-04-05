import React, { PropTypes } from 'react';
import { translate } from 'admin-on-rest';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import ContentDrafts from 'material-ui/svg-icons/action/settings';
import IcCloudUpload from 'material-ui/svg-icons/action/accessibility';
import BasicInfoCompany from 'material-ui/svg-icons/action/accessible';
export default [
  {
    'name':'platformbaseinfo',
    'icon': <IcCloudUpload />,
    'children': [
      {
        'name':'baseinfocompany',
        'icon': <BasicInfoCompany />,
      },
      {
        'name':'baseinfocompanystat',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfocompanypay',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfocompanyservice',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfocompanypermit',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfocompanyfare',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfovehicle',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfovehiclelnsurance',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfovehicletotalmile',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfodriver',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfodrivereducate',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfodriverapp',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfodriverstat',
        'icon': <SettingsIcon />,
      },
      {
        'name':'baseinfopassenger',
        'icon': <SettingsIcon />,
      },
    ]
  },
  {
    'name':'platformorder',
    'icon': <ContentDrafts />,
    'children': [
      {
        'name':'ordercreate',
        'icon': <SettingsIcon />,
      },
      {
        'name':'ordermatch',
        'icon': <SettingsIcon />,
      },
      {
        'name':'ordercancel',
        'icon': <SettingsIcon />,
      }
    ]
  },
  {
    'name':'platformoperate',
    'icon': <ContentDrafts />,
    'children': [
      {
        'name':'operatelogin',
        'icon': <SettingsIcon />,
      },
      {
        'name':'operatelogout',
        'icon': <SettingsIcon />,
      },
      {
        'name':'operatedepart',
        'icon': <SettingsIcon />,
      },
      {
        'name':'operatearrive',
        'icon': <SettingsIcon />,
      },
      {
        'name':'operatepay',
        'icon': <SettingsIcon />,
      },
    ]
  },
  {
    'name':'platformposition',
    'icon': <ContentDrafts />,
    'children': [
      {
        'name':'positiondriver',
        'icon': <SettingsIcon />,
      },
      {
        'name':'positionvehicle',
        'icon': <SettingsIcon />,
      },
    ]
  },
  {
    'name':'platformrated',
    'icon': <ContentDrafts />,
    'children': [
      {
        'name':'ratedpassenger',
        'icon': <SettingsIcon />,
      },
      {
        'name':'ratedpassengercomplaint',
        'icon': <SettingsIcon />,
      },
      ,
      {
        'name':'rateddriverpunish',
        'icon': <SettingsIcon />,
      },
      ,
      {
        'name':'rateddriver',
        'icon': <SettingsIcon />,
      },
    ]
  },
  {
    'name':'sysinfo',
    'icon': <ContentDrafts />,
    'children': [
      {
        'name':'systemconfig',
        'icon': <SettingsIcon />,
      },
      {
        'name':'notifymessage',
        'icon': <SettingsIcon />,
      },
      {
        'name':'faretype',
        'icon': <SettingsIcon />,
      },
      {
        'name':'price',
        'icon': <SettingsIcon />,
      },
      {
        'name':'about',
        'icon': <SettingsIcon />,
      },
      {
        'name':'buscarpool',
        'icon': <SettingsIcon />,
      },
      {
        'name':'tourbusinfo',
        'icon': <SettingsIcon />,
      },
      {
        'name':'coupon',
        'icon': <SettingsIcon />,
      },
      {
        'name':'order',
        'icon': <SettingsIcon />,
      },
      {
        'name':'triprequest',
        'icon': <SettingsIcon />,
      }

    ]
  },
  {
    'name':'usermgr',
    'icon': <ContentDrafts />,
    'children': [
      {
        'name':'userdriver',
        'icon': <SettingsIcon />,
      },
      {
        'name':'userrider',
        'icon': <SettingsIcon />,
      }
    ]
  },

];
