export const projectsData = [
  {
    "metadata": {
      "name": "my-proj-a",
      "selfLink": "/oapi/v1/projectsmy-proj-a",
      "uid": "40f7a2df-0e78-11e7-ad0b-080027241116",
      "resourceVersion": "1398",
      "creationTimestamp": "2017-03-21T20:52:10Z",
      "annotations": {
        "openshift.io/description": "",
        "openshift.io/display-name": "My Project A",
        "openshift.io/requester": "dev",
        "openshift.io/sa.scc.mcs": "s0:c7,c4",
        "openshift.io/sa.scc.supplemental-groups": "1000050000/10000",
        "openshift.io/sa.scc.uid-range": "1000050000/10000"
      }
    },
    "spec": {
      "finalizers": ["openshift.io/origin", "kubernetes"]
    },
    "status": {
      "phase": "Active"
    },
    "kind": "Project",
    "apiVersion": "v1"
  }
];
