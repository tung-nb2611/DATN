import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import 'assets/css/search/RoleFilters.css'
import RolesService from "services/RoleService.js";
import { ArrowDropDown } from "@material-ui/icons";

RoleFilters.propTypes = {
  onSubmit: PropTypes.func,
}
RoleFilters.defaultProps = {
  onSubmit: null,
}
function RoleFilters(props) {
  const { onSubmit } = props;
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    async function fetchRole() {
      RolesService.getRoleUsing()
        .then((res) => {
          console.log("List ROle : " + res.data);
          let roles = res.data;
          setRoles(
            roles.map((role) => {
              return {
                select: false,
                id: role.id,
                code: role.code,
                name: role.name,
                description: role.description,
                status: role.status
              }
            }));
        })
    }
    fetchRole();
  }, []);

  function hanleChangeRole() {
    const roleId = [];
    roles.forEach(role => {
      if (role.select) {
        roleId.push(role.id);
      }
    });
    if(roleId.length == 0) {
      roleId.push([1,2,3]);
    }
    console.log(roleId);

    const formValues = {
      ids: roleId,
    }
    console.log(formValues)
    onSubmit(formValues);

  }


  return (
    <div className="button-select-role">
      <div className="title-select"><span>Chọn loại NV</span><ArrowDropDown style={{ width: "15px" }} /></div>
      <div className="button-content-filters-role">
        <span>Lọc theo loại NV</span>
        <table>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="td-1">
                <input
                  className="input-1"
                  type="checkbox"
                  onChange={e => {
                    let value = e.target.checked;
                    setRoles(
                      roles.map(roleCheck => {
                        if (roleCheck.id === role.id) {
                          roleCheck.select = value;
                        }
                        return roleCheck;
                      })
                    );
                  }} />
              </td>
              <td className="td-2"><span>{role.description}</span></td>
            </tr>
          ))}
        </table>
        <button onClick={hanleChangeRole}>Lọc</button>
      </div>
    </div>
  )
}


export default RoleFilters

