// This is not the best way to go with the tree component. I recommend you to use webpack with babel as described in the README file.
Vue.use(bootstrapVueTreeview['default']);

let count = 100;

var app = new Vue({
    template: `
	<div class="row">
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<b-tree-view
						:data="treeData"
                        :selectedItems="selectedItems"
                        :prefix="'user-right'"
						ref="tree"
						:nodesDraggable="false"
						:contextMenu="false"
						:contextMenuItems="contextMenuItems"
						:renameNodeOnDblClick="false"
						:showIcons="true"
						iconClassProp="icon"
						prependIconClass="fas"
						@contextMenuItemSelect="menuItemSelected"
						@nodeSelect="nodeSelect"></b-tree-view>
				</div>
			</div>
		</div>
        <div>{{ selectedItems }}</div>
		<div class="col-md-8" v-if="selectedNode">
			<div class="card">
				<div class="card-body">
					Node {{ selectedNode.name }} is selected
				</div>
			</div>
		</div>
	</div>`,
    el: '#app',
    data() {
        return {
            selectedItems: [],
            treeData: [
                {
                    "id": 1,
                    "name": "Users",
                    "icon": "fa-users",
                    "hasCheckBox": true,
                },
                {
                    "id": 2,
                    "name": "Books",
                    "icon": "fa-book",
                    "children": [
                        {
                            "id": 3,
                            "name": "Neptune",
                            "icon": "fa-book",
                            "hasCheckBox": true
                        }
                    ]
                },
                {
                    "id": 5,
                    "name": "Vehicles",
                    "children": [
                        {
                            "id": 23,
                            "name": "Cars",
                            "icon": "fa-car"
                        },
                        {
                            "id": 34,
                            "name": "Trucks",
                            "icon": "fa-truck",
                            "children": [
                                {
                                    "id": 101,
                                    "name": "Mars",
                                    "hasCheckBox": true,
                                }
                            ]
                        }
                    ]
                }
            ],
            selectedNode: null,
            contextMenuItems: [{ code: 'DELETE_NODE', label: 'Delete node' }, {
                code: 'ADD_CHILD_NODE',
                label: 'Add child'
            }, { code: 'RENAME_NODE', label: 'Rename' }]
        }
    },
    methods: {
        nodeSelect(node, isSelected) {
            console.log('Node ' + node.data.name + ' has been ' + (isSelected ? 'selected' : 'deselected'))
            if (isSelected) {
                this.selectedNode = node.data
            } else if (node.data === this.selectedNode) {
                this.selectedNode = null
            }
        },
        menuItemSelected(item, node) {
            if (item.code === 'ADD_CHILD_NODE') {
                node.appendChild({
                    id: count++,
                    name: 'My new node'
                })
            }
        }
    }
})


// add "tree is ready" event
setTimeout(() => {
    console.log(app.$refs.tree.getNodeByKey(5).data.id) // TO DO: remove it, only for temporary testing, add professional tests
}, 1000)
