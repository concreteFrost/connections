export const mockedGroupsList = [
  {
    groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
    name: "AllNotificationsGroup",
    description: "Members will have access to all notifications",
    active: true,
    owner: "00000000-0000-0000-0000-000000000000",
    dateCreated: "2023-11-28T14:13:07.477",
    lastAmended: "2023-11-28T14:13:07.477",
    groupMembers: [
      {
        userId: "15232f28-3737-4d47-872a-ee0a3729ab6c",
        userLogin: "iliaM",
        userName: "Ilia Morozov",
        isActive: true,
        emailAddress: "test@test.test",
        emailConfirmed: false,
        phone: "0740000000",
        phoneConfirmed: false,
        userLevel: 2,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2023-11-21T13:54:41.7",
        lastUpdated: "2024-07-17T13:40:34.377",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 2047,
        userRoles: [
          {
            roleId: 1,
            roleName: "HasDashboardVisibility",
            roleDescription: "User can view server Metrics, KPIs, Visuals etc.",
          },
          {
            roleId: 2,
            roleName: "CanCreateDraftFlows",
            roleDescription:
              "User can create draft flows in the designer and save them in the Draft Repository",
          },
          {
            roleId: 4,
            roleName: "CanDeleteDraftFlows",
            roleDescription: "User can delete flows from the Draft Repository",
          },
          {
            roleId: 8,
            roleName: "CanApproveDraftFlows",
            roleDescription:
              "User can approve draft flows for release to the live Connections Engine",
          },
          {
            roleId: 16,
            roleName: "CanReleaseDraftFlows",
            roleDescription:
              "User can release a draft flow to the live Connections Engine",
          },
          {
            roleId: 32,
            roleName: "CanAccessLogs",
            roleDescription: "User perform searches on server logs",
          },
          {
            roleId: 64,
            roleName: "CanManageAlerts",
            roleDescription:
              "User can create/remove alerts and manage the Alert system",
          },
          {
            roleId: 128,
            roleName: "CanManageLiveFlows",
            roleDescription:
              "User can stop, start, terminate, enable, disable, restart, DebugAt live flows",
          },
          {
            roleId: 256,
            roleName: "CanManageServer",
            roleDescription:
              "User can stop, start or kill the Connections Engine",
          },
          {
            roleId: 512,
            roleName: "CanManageSecurity",
            roleDescription:
              "User can manage users/logins, user groups and role assignments",
          },
          {
            roleId: 1024,
            roleName: "IsSuperUser",
            roleDescription: "User has complete system access to all roles",
          },
        ],
      },
      {
        userId: "2d349fc5-f7db-4e98-8497-1a9bbc98683b",
        userLogin: "ChrisW",
        userName: "Chris Wootton",
        isActive: true,
        emailAddress: "chris.wootton@e-cocoon.com",
        emailConfirmed: false,
        phone: "",
        phoneConfirmed: false,
        userLevel: 1,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2024-04-05T13:12:26.857",
        lastUpdated: "2024-06-04T15:01:57.387",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 2047,
        userRoles: [
          {
            roleId: 1,
            roleName: "HasDashboardVisibility",
            roleDescription: "User can view server Metrics, KPIs, Visuals etc.",
          },
          {
            roleId: 2,
            roleName: "CanCreateDraftFlows",
            roleDescription:
              "User can create draft flows in the designer and save them in the Draft Repository",
          },
          {
            roleId: 4,
            roleName: "CanDeleteDraftFlows",
            roleDescription: "User can delete flows from the Draft Repository",
          },
          {
            roleId: 8,
            roleName: "CanApproveDraftFlows",
            roleDescription:
              "User can approve draft flows for release to the live Connections Engine",
          },
          {
            roleId: 16,
            roleName: "CanReleaseDraftFlows",
            roleDescription:
              "User can release a draft flow to the live Connections Engine",
          },
          {
            roleId: 32,
            roleName: "CanAccessLogs",
            roleDescription: "User perform searches on server logs",
          },
          {
            roleId: 64,
            roleName: "CanManageAlerts",
            roleDescription:
              "User can create/remove alerts and manage the Alert system",
          },
          {
            roleId: 128,
            roleName: "CanManageLiveFlows",
            roleDescription:
              "User can stop, start, terminate, enable, disable, restart, DebugAt live flows",
          },
          {
            roleId: 256,
            roleName: "CanManageServer",
            roleDescription:
              "User can stop, start or kill the Connections Engine",
          },
          {
            roleId: 512,
            roleName: "CanManageSecurity",
            roleDescription:
              "User can manage users/logins, user groups and role assignments",
          },
          {
            roleId: 1024,
            roleName: "IsSuperUser",
            roleDescription: "User has complete system access to all roles",
          },
        ],
      },
      {
        userId: "59d6ef88-b666-432f-99c3-ea0f434e6615",
        userLogin: "richT",
        userName: "richT",
        isActive: true,
        emailAddress: "richard.tisdall@e-cocoon.com",
        emailConfirmed: false,
        phone: "07719 052578",
        phoneConfirmed: false,
        userLevel: 1,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2023-11-21T13:56:28.743",
        lastUpdated: "2024-06-04T15:05:57.173",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 1024,
        userRoles: [
          {
            roleId: 1024,
            roleName: "IsSuperUser",
            roleDescription: "User has complete system access to all roles",
          },
        ],
      },
      {
        userId: "ab0e74d0-9108-495f-88ca-c1c8999b09a1",
        userLogin: "2222",
        userName: "richT",
        isActive: false,
        emailAddress: "",
        emailConfirmed: false,
        phone: "",
        phoneConfirmed: false,
        userLevel: 2,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2024-01-17T12:10:59.573",
        lastUpdated: "2024-03-25T16:51:04.167",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
        ],
        userRoleValue: 1,
        userRoles: [
          {
            roleId: 1,
            roleName: "HasDashboardVisibility",
            roleDescription: "User can view server Metrics, KPIs, Visuals etc.",
          },
        ],
      },
      {
        userId: "b0ec9872-da6f-41f0-8159-ac463a10f9bf",
        userLogin: "ianm2",
        userName: "Ian Mulgrew",
        isActive: true,
        emailAddress: "ian.mulgrew@e-cocoon.com",
        emailConfirmed: true,
        phone: "01234 567890",
        phoneConfirmed: false,
        userLevel: 1,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2023-11-29T16:52:21.787",
        lastUpdated: "2024-03-07T10:39:55.333",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 190,
        userRoles: [
          {
            roleId: 2,
            roleName: "CanCreateDraftFlows",
            roleDescription:
              "User can create draft flows in the designer and save them in the Draft Repository",
          },
          {
            roleId: 4,
            roleName: "CanDeleteDraftFlows",
            roleDescription: "User can delete flows from the Draft Repository",
          },
          {
            roleId: 8,
            roleName: "CanApproveDraftFlows",
            roleDescription:
              "User can approve draft flows for release to the live Connections Engine",
          },
          {
            roleId: 16,
            roleName: "CanReleaseDraftFlows",
            roleDescription:
              "User can release a draft flow to the live Connections Engine",
          },
          {
            roleId: 32,
            roleName: "CanAccessLogs",
            roleDescription: "User perform searches on server logs",
          },
          {
            roleId: 128,
            roleName: "CanManageLiveFlows",
            roleDescription:
              "User can stop, start, terminate, enable, disable, restart, DebugAt live flows",
          },
        ],
      },
    ],
  },
  {
    groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
    name: "Draft Flowers",
    description: "Draft flow creators",
    active: true,
    owner: "00000000-0000-0000-0000-000000000000",
    dateCreated: "2023-11-29T17:01:34",
    lastAmended: "2023-11-29T17:01:34",
    groupMembers: [
      {
        userId: "15232f28-3737-4d47-872a-ee0a3729ab6c",
        userLogin: "iliaM",
        userName: "Ilia Morozov",
        isActive: true,
        emailAddress: "test@test.test",
        emailConfirmed: false,
        phone: "0740000000",
        phoneConfirmed: false,
        userLevel: 2,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2023-11-21T13:54:41.7",
        lastUpdated: "2024-07-17T13:40:34.377",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 2047,
        userRoles: [
          {
            roleId: 1,
            roleName: "HasDashboardVisibility",
            roleDescription: "User can view server Metrics, KPIs, Visuals etc.",
          },
          {
            roleId: 2,
            roleName: "CanCreateDraftFlows",
            roleDescription:
              "User can create draft flows in the designer and save them in the Draft Repository",
          },
          {
            roleId: 4,
            roleName: "CanDeleteDraftFlows",
            roleDescription: "User can delete flows from the Draft Repository",
          },
          {
            roleId: 8,
            roleName: "CanApproveDraftFlows",
            roleDescription:
              "User can approve draft flows for release to the live Connections Engine",
          },
          {
            roleId: 16,
            roleName: "CanReleaseDraftFlows",
            roleDescription:
              "User can release a draft flow to the live Connections Engine",
          },
          {
            roleId: 32,
            roleName: "CanAccessLogs",
            roleDescription: "User perform searches on server logs",
          },
          {
            roleId: 64,
            roleName: "CanManageAlerts",
            roleDescription:
              "User can create/remove alerts and manage the Alert system",
          },
          {
            roleId: 128,
            roleName: "CanManageLiveFlows",
            roleDescription:
              "User can stop, start, terminate, enable, disable, restart, DebugAt live flows",
          },
          {
            roleId: 256,
            roleName: "CanManageServer",
            roleDescription:
              "User can stop, start or kill the Connections Engine",
          },
          {
            roleId: 512,
            roleName: "CanManageSecurity",
            roleDescription:
              "User can manage users/logins, user groups and role assignments",
          },
          {
            roleId: 1024,
            roleName: "IsSuperUser",
            roleDescription: "User has complete system access to all roles",
          },
        ],
      },
      {
        userId: "2d349fc5-f7db-4e98-8497-1a9bbc98683b",
        userLogin: "ChrisW",
        userName: "Chris Wootton",
        isActive: true,
        emailAddress: "chris.wootton@e-cocoon.com",
        emailConfirmed: false,
        phone: "",
        phoneConfirmed: false,
        userLevel: 1,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2024-04-05T13:12:26.857",
        lastUpdated: "2024-06-04T15:01:57.387",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 2047,
        userRoles: [
          {
            roleId: 1,
            roleName: "HasDashboardVisibility",
            roleDescription: "User can view server Metrics, KPIs, Visuals etc.",
          },
          {
            roleId: 2,
            roleName: "CanCreateDraftFlows",
            roleDescription:
              "User can create draft flows in the designer and save them in the Draft Repository",
          },
          {
            roleId: 4,
            roleName: "CanDeleteDraftFlows",
            roleDescription: "User can delete flows from the Draft Repository",
          },
          {
            roleId: 8,
            roleName: "CanApproveDraftFlows",
            roleDescription:
              "User can approve draft flows for release to the live Connections Engine",
          },
          {
            roleId: 16,
            roleName: "CanReleaseDraftFlows",
            roleDescription:
              "User can release a draft flow to the live Connections Engine",
          },
          {
            roleId: 32,
            roleName: "CanAccessLogs",
            roleDescription: "User perform searches on server logs",
          },
          {
            roleId: 64,
            roleName: "CanManageAlerts",
            roleDescription:
              "User can create/remove alerts and manage the Alert system",
          },
          {
            roleId: 128,
            roleName: "CanManageLiveFlows",
            roleDescription:
              "User can stop, start, terminate, enable, disable, restart, DebugAt live flows",
          },
          {
            roleId: 256,
            roleName: "CanManageServer",
            roleDescription:
              "User can stop, start or kill the Connections Engine",
          },
          {
            roleId: 512,
            roleName: "CanManageSecurity",
            roleDescription:
              "User can manage users/logins, user groups and role assignments",
          },
          {
            roleId: 1024,
            roleName: "IsSuperUser",
            roleDescription: "User has complete system access to all roles",
          },
        ],
      },
      {
        userId: "59d6ef88-b666-432f-99c3-ea0f434e6615",
        userLogin: "richT",
        userName: "richT",
        isActive: true,
        emailAddress: "richard.tisdall@e-cocoon.com",
        emailConfirmed: false,
        phone: "07719 052578",
        phoneConfirmed: false,
        userLevel: 1,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2023-11-21T13:56:28.743",
        lastUpdated: "2024-06-04T15:05:57.173",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 1024,
        userRoles: [
          {
            roleId: 1024,
            roleName: "IsSuperUser",
            roleDescription: "User has complete system access to all roles",
          },
        ],
      },
      {
        userId: "b0ec9872-da6f-41f0-8159-ac463a10f9bf",
        userLogin: "ianm2",
        userName: "Ian Mulgrew",
        isActive: true,
        emailAddress: "ian.mulgrew@e-cocoon.com",
        emailConfirmed: true,
        phone: "01234 567890",
        phoneConfirmed: false,
        userLevel: 1,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2023-11-29T16:52:21.787",
        lastUpdated: "2024-03-07T10:39:55.333",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 190,
        userRoles: [
          {
            roleId: 2,
            roleName: "CanCreateDraftFlows",
            roleDescription:
              "User can create draft flows in the designer and save them in the Draft Repository",
          },
          {
            roleId: 4,
            roleName: "CanDeleteDraftFlows",
            roleDescription: "User can delete flows from the Draft Repository",
          },
          {
            roleId: 8,
            roleName: "CanApproveDraftFlows",
            roleDescription:
              "User can approve draft flows for release to the live Connections Engine",
          },
          {
            roleId: 16,
            roleName: "CanReleaseDraftFlows",
            roleDescription:
              "User can release a draft flow to the live Connections Engine",
          },
          {
            roleId: 32,
            roleName: "CanAccessLogs",
            roleDescription: "User perform searches on server logs",
          },
          {
            roleId: 128,
            roleName: "CanManageLiveFlows",
            roleDescription:
              "User can stop, start, terminate, enable, disable, restart, DebugAt live flows",
          },
        ],
      },
    ],
  },
  {
    groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
    name: "Ops Section",
    description: "Dashboard operations group",
    active: true,
    owner: "00000000-0000-0000-0000-000000000000",
    dateCreated: "2023-11-29T17:02:33.833",
    lastAmended: "2023-11-29T17:02:33.833",
    groupMembers: [
      {
        userId: "15232f28-3737-4d47-872a-ee0a3729ab6c",
        userLogin: "iliaM",
        userName: "Ilia Morozov",
        isActive: true,
        emailAddress: "test@test.test",
        emailConfirmed: false,
        phone: "0740000000",
        phoneConfirmed: false,
        userLevel: 2,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2023-11-21T13:54:41.7",
        lastUpdated: "2024-07-17T13:40:34.377",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 2047,
        userRoles: [
          {
            roleId: 1,
            roleName: "HasDashboardVisibility",
            roleDescription: "User can view server Metrics, KPIs, Visuals etc.",
          },
          {
            roleId: 2,
            roleName: "CanCreateDraftFlows",
            roleDescription:
              "User can create draft flows in the designer and save them in the Draft Repository",
          },
          {
            roleId: 4,
            roleName: "CanDeleteDraftFlows",
            roleDescription: "User can delete flows from the Draft Repository",
          },
          {
            roleId: 8,
            roleName: "CanApproveDraftFlows",
            roleDescription:
              "User can approve draft flows for release to the live Connections Engine",
          },
          {
            roleId: 16,
            roleName: "CanReleaseDraftFlows",
            roleDescription:
              "User can release a draft flow to the live Connections Engine",
          },
          {
            roleId: 32,
            roleName: "CanAccessLogs",
            roleDescription: "User perform searches on server logs",
          },
          {
            roleId: 64,
            roleName: "CanManageAlerts",
            roleDescription:
              "User can create/remove alerts and manage the Alert system",
          },
          {
            roleId: 128,
            roleName: "CanManageLiveFlows",
            roleDescription:
              "User can stop, start, terminate, enable, disable, restart, DebugAt live flows",
          },
          {
            roleId: 256,
            roleName: "CanManageServer",
            roleDescription:
              "User can stop, start or kill the Connections Engine",
          },
          {
            roleId: 512,
            roleName: "CanManageSecurity",
            roleDescription:
              "User can manage users/logins, user groups and role assignments",
          },
          {
            roleId: 1024,
            roleName: "IsSuperUser",
            roleDescription: "User has complete system access to all roles",
          },
        ],
      },
      {
        userId: "2d349fc5-f7db-4e98-8497-1a9bbc98683b",
        userLogin: "ChrisW",
        userName: "Chris Wootton",
        isActive: true,
        emailAddress: "chris.wootton@e-cocoon.com",
        emailConfirmed: false,
        phone: "",
        phoneConfirmed: false,
        userLevel: 1,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2024-04-05T13:12:26.857",
        lastUpdated: "2024-06-04T15:01:57.387",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 2047,
        userRoles: [
          {
            roleId: 1,
            roleName: "HasDashboardVisibility",
            roleDescription: "User can view server Metrics, KPIs, Visuals etc.",
          },
          {
            roleId: 2,
            roleName: "CanCreateDraftFlows",
            roleDescription:
              "User can create draft flows in the designer and save them in the Draft Repository",
          },
          {
            roleId: 4,
            roleName: "CanDeleteDraftFlows",
            roleDescription: "User can delete flows from the Draft Repository",
          },
          {
            roleId: 8,
            roleName: "CanApproveDraftFlows",
            roleDescription:
              "User can approve draft flows for release to the live Connections Engine",
          },
          {
            roleId: 16,
            roleName: "CanReleaseDraftFlows",
            roleDescription:
              "User can release a draft flow to the live Connections Engine",
          },
          {
            roleId: 32,
            roleName: "CanAccessLogs",
            roleDescription: "User perform searches on server logs",
          },
          {
            roleId: 64,
            roleName: "CanManageAlerts",
            roleDescription:
              "User can create/remove alerts and manage the Alert system",
          },
          {
            roleId: 128,
            roleName: "CanManageLiveFlows",
            roleDescription:
              "User can stop, start, terminate, enable, disable, restart, DebugAt live flows",
          },
          {
            roleId: 256,
            roleName: "CanManageServer",
            roleDescription:
              "User can stop, start or kill the Connections Engine",
          },
          {
            roleId: 512,
            roleName: "CanManageSecurity",
            roleDescription:
              "User can manage users/logins, user groups and role assignments",
          },
          {
            roleId: 1024,
            roleName: "IsSuperUser",
            roleDescription: "User has complete system access to all roles",
          },
        ],
      },
      {
        userId: "59d6ef88-b666-432f-99c3-ea0f434e6615",
        userLogin: "richT",
        userName: "richT",
        isActive: true,
        emailAddress: "richard.tisdall@e-cocoon.com",
        emailConfirmed: false,
        phone: "07719 052578",
        phoneConfirmed: false,
        userLevel: 1,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2023-11-21T13:56:28.743",
        lastUpdated: "2024-06-04T15:05:57.173",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 1024,
        userRoles: [
          {
            roleId: 1024,
            roleName: "IsSuperUser",
            roleDescription: "User has complete system access to all roles",
          },
        ],
      },
      {
        userId: "b0ec9872-da6f-41f0-8159-ac463a10f9bf",
        userLogin: "ianm2",
        userName: "Ian Mulgrew",
        isActive: true,
        emailAddress: "ian.mulgrew@e-cocoon.com",
        emailConfirmed: true,
        phone: "01234 567890",
        phoneConfirmed: false,
        userLevel: 1,
        restrictedToIPAddress: "0.0.0.0",
        dateCreated: "2023-11-29T16:52:21.787",
        lastUpdated: "2024-03-07T10:39:55.333",
        belongsToGroups: [
          {
            groupId: "6bfd9258-0c22-4515-a605-aefad52858a2",
            name: "AllNotificationsGroup",
            description: "Members will have access to all notifications",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-28T14:13:07.477",
            lastAmended: "2023-11-28T14:13:07.477",
          },
          {
            groupId: "1dcf89af-52a3-409f-9640-b21b006f346b",
            name: "Draft Flowers",
            description: "Draft flow creators",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:01:34",
            lastAmended: "2023-11-29T17:01:34",
          },
          {
            groupId: "827df73b-13a3-46ce-84cb-e506772fef7d",
            name: "Ops Section",
            description: "Dashboard operations group",
            active: true,
            owner: "00000000-0000-0000-0000-000000000000",
            dateCreated: "2023-11-29T17:02:33.833",
            lastAmended: "2023-11-29T17:02:33.833",
          },
        ],
        userRoleValue: 190,
        userRoles: [
          {
            roleId: 2,
            roleName: "CanCreateDraftFlows",
            roleDescription:
              "User can create draft flows in the designer and save them in the Draft Repository",
          },
          {
            roleId: 4,
            roleName: "CanDeleteDraftFlows",
            roleDescription: "User can delete flows from the Draft Repository",
          },
          {
            roleId: 8,
            roleName: "CanApproveDraftFlows",
            roleDescription:
              "User can approve draft flows for release to the live Connections Engine",
          },
          {
            roleId: 16,
            roleName: "CanReleaseDraftFlows",
            roleDescription:
              "User can release a draft flow to the live Connections Engine",
          },
          {
            roleId: 32,
            roleName: "CanAccessLogs",
            roleDescription: "User perform searches on server logs",
          },
          {
            roleId: 128,
            roleName: "CanManageLiveFlows",
            roleDescription:
              "User can stop, start, terminate, enable, disable, restart, DebugAt live flows",
          },
        ],
      },
    ],
  },
];
