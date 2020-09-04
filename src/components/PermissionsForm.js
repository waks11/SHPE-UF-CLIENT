import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag"

import {Grid, Form, Button, Message} from "semantic-ui-react";
import { PERMISSIONS } from "../util/permissions";


let originalPermissions = []

export default function PermissionsForm({userInfo}) {
    const [errors, setErrors] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [permissions, setPermissions] = useState({
        admin: userInfo.permission.includes(PERMISSIONS.ADMIN),
        super: userInfo.permission.includes(PERMISSIONS.SUPER),
        members: userInfo.permission.includes(PERMISSIONS.MEMBERS),
        events: userInfo.permission.includes(PERMISSIONS.EVENTS),
        tasks: userInfo.permission.includes(PERMISSIONS.TASKS),
        requests: userInfo.permission.includes(PERMISSIONS.REQUESTS),
        statistics: userInfo.permission.includes(PERMISSIONS.STATS),
        corporateDatabase: userInfo.permission.includes(PERMISSIONS.CORP),
        reimbursements: userInfo.permission.includes(PERMISSIONS.REIMB)
    });

    // get the current user, query the database to get the permissions of that
    // user, and update the object with those permissions.
    let {user: loggedInUser} = useContext(AuthContext)
    let {data: {getUser:{permission}}} = useQuery(FETCH_USER_QUERY, {
        variables: {
            userId: loggedInUser.id
        }
    })
    loggedInUser.permission = permission
    let currentPermissions = []

    if (userInfo) {
        originalPermissions = userInfo.permission.split("-");
        for(let key in permissions) {
            if (permissions[key]) {
                currentPermissions.push(key)
            }
        }
    }

    const [changePermissionMutation, other] = useMutation(CHANGE_PERMISSION, {
        onError(err) {
            setPermissions({
                admin: userInfo.permission.includes(PERMISSIONS.ADMIN),
                super: userInfo.permission.includes(PERMISSIONS.SUPER),
                members: userInfo.permission.includes(PERMISSIONS.MEMBERS),
                events: userInfo.permission.includes(PERMISSIONS.EVENTS),
                tasks: userInfo.permission.includes(PERMISSIONS.TASKS),
                requests: userInfo.permission.includes(PERMISSIONS.REQUESTS),
                statistics: userInfo.permission.includes(PERMISSIONS.STATS),
                corporateDatabase: userInfo.permission.includes(PERMISSIONS.CORP),
                reimbursements: userInfo.permission.includes(PERMISSIONS.REIMB)
            });
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        update(cache, data) { 
            userInfo.permission = currentPermissions.toString().replace(/,/g, "-");
            setPermissions(currentPermissions)
        }
    });

    const areEqual = (a, b) => {
        if (a.length == b.length) {
            if (a.every((value, index) => value === b[index])) {
                return true
            }
        }
        return false
    }

    const onChange = (_, {name, checked}) => {

        if (checked){
            // check if the current user does not have basic admin permissions yet
            // if we are setting Super permissions, and the user is not admin yet, add admin permissions first
            if(name === PERMISSIONS.SUPER && !currentPermissions.includes(PERMISSIONS.ADMIN)) {   
                currentPermissions.push(PERMISSIONS.ADMIN)
            }
            currentPermissions.push(name)
        } else {
            currentPermissions.splice(currentPermissions.indexOf(name), 1);
        }

        setPermissions({ ...permissions, [name]: checked });
        setButtonDisabled(areEqual(originalPermissions.sort(), currentPermissions.sort()))
    };

    const onSubmit = () => {
        setButtonDisabled(true)
        changePermission()
    }

    const changePermission = () => {
        const values = {
            email: userInfo.email,
            currentEmail: loggedInUser.email,
            permission: currentPermissions.toString().replace(/,/g, "-")
        }
        changePermissionMutation({variables: values})
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <h3>Permissions</h3>
                    <Form 
                        onSubmit={onSubmit}
                        widths='equal'
                        error={Object.keys(errors).length !== 0 && errors.constructor === Object}
                    >
                        <Form.Group>
                            <Form.Radio
                                toggle
                                disabled={!loggedInUser.permission.includes(PERMISSIONS.ADMIN)}
                                name={PERMISSIONS.TASKS}
                                defaultChecked={userInfo.permission.includes(PERMISSIONS.TASKS) || userInfo.permission.includes(PERMISSIONS.SUPER)}
                                onChange={onChange}
                                label='Tasks'
                            />
                            <Form.Radio
                                toggle
                                disabled={!loggedInUser.permission.includes(PERMISSIONS.ADMIN)}
                                name={PERMISSIONS.REQUESTS}
                                defaultChecked={userInfo.permission.includes(PERMISSIONS.REQUESTS) || userInfo.permission.includes(PERMISSIONS.SUPER)}
                                onChange={onChange}
                                label='Requests'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Radio
                                toggle
                                disabled={!loggedInUser.permission.includes(PERMISSIONS.ADMIN)}
                                name={PERMISSIONS.EVENTS}
                                defaultChecked={userInfo.permission.includes(PERMISSIONS.TASKS) || userInfo.permission.includes(PERMISSIONS.SUPER)}
                                onChange={onChange}
                                label='Events'
                            />
                            <Form.Radio
                                toggle
                                disabled={!loggedInUser.permission.includes(PERMISSIONS.ADMIN)}
                                name={PERMISSIONS.SUPER}
                                defaultChecked={userInfo.permission.includes(PERMISSIONS.SUPER) || userInfo.permission.includes(PERMISSIONS.SUPER)}
                                onChange={onChange}
                                label='Super Admin'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Radio
                                toggle
                                disabled={!loggedInUser.permission.includes(PERMISSIONS.ADMIN)}
                                name={PERMISSIONS.STATS}
                                defaultChecked={userInfo.permission.includes(PERMISSIONS.STATS) || userInfo.permission.includes(PERMISSIONS.SUPER)}
                                onChange={onChange}
                                label='Statistics'
                            />
                            <Form.Radio
                                toggle
                                disabled={!loggedInUser.permission.includes(PERMISSIONS.ADMIN)}
                                name={PERMISSIONS.REIMB}
                                defaultChecked={userInfo.permission.includes(PERMISSIONS.REIMB) || userInfo.permission.includes(PERMISSIONS.SUPER)}
                                onChange={onChange}
                                label='Reimbursements'
                            />
                            </Form.Group>
                        <Form.Group>
                            <Form.Radio
                                toggle
                                disabled={!loggedInUser.permission.includes(PERMISSIONS.ADMIN)}
                                name={PERMISSIONS.MEMBERS}
                                defaultChecked={userInfo.permission.includes(PERMISSIONS.MEMBERS) || userInfo.permission.includes(PERMISSIONS.SUPER)}
                                onChange={onChange}
                                label='Members'
                            />
                            <Form.Radio
                                toggle
                                disabled={!loggedInUser.permission.includes(PERMISSIONS.ADMIN)}
                                name={PERMISSIONS.CORP}
                                defaultChecked={userInfo.permission.includes(PERMISSIONS.CORP) || userInfo.permission.includes(PERMISSIONS.SUPER)}
                                onChange={onChange}
                                label='Corporate Database'
                            />
                        </Form.Group>
                        <Message
                            error
                            header='Action Forbidden'
                            content= {
                                errors.general
                            }
                        />
                        {buttonDisabled 
                        ?('') 
                        : (
                            <Button
                                floated='right'
                                type='submit'
                                content='Apply'
                            />
                        )}
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const CHANGE_PERMISSION = gql`
  mutation changePermission($email: String!, $currentEmail: String!, $permission: String!) {
    changePermission(email: $email, currentEmail: $currentEmail, permission: $permission)
  }
`;

const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      permission
    }
  }
`;
