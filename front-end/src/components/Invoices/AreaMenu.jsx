import React from "react";
import { connect } from "react-redux";
import { Popover, PopoverBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { UICardContainer } from "../../common/UICardLayout";
import selectChevron from "../../common/selectChevron.svg";
import cancelSmallMinor from "../../common/cancelSmallMinor.svg";
class AreaMenu extends React.Component {
    state = {
        popoverMenu: false,
        width: 0,
        id: 1,
        currentDisplayMenu: [],
        menuName: "",
        stateMenu: null,
        openPopupMenu: false,
    };

    myInput = React.createRef();
    // componentDidMount() {
    //     this.setState({ width: this.myInput.current.offsetWidth });
    //     document.addEventListener("click", this.clickOutsideHandler);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener("click", this.clickOutsideHandler);
    // }

    clickOutsideHandler = (event) => {
        if (
            this.state.popoverMenu &&
            !this.state.openPopupMenu &&
            (!this.myInput.current || !this.myInput.current.contains(event.target))
        ) {
            this.setState({ popoverMenu: false });
        }
    };

    togglePopoverMenu = () => {
        this.setState(
            (state) => ({ popoverMenu: !state.popoverMenu, openPopupMenu: false }),
            () => {
                if (this.state.popoverMenu) {
                    this.setState({ currentDisplayMenu: this.props.areaMenu });
                }
            }
        );
    };

    handleInputSearchChange = (event) => {
        if (!this.state.popoverMenu) {
            this.setState({ popoverMenu: true, openPopupMenu: false });
        }

        this.setState({
            menuName: event.target.value,
            openPopupMenu: false,
            currentDisplayMenu: this.props.menuList.filter((menu) =>
                menu.name.toLowerCase().includes(event.target.value.toLowerCase())
            ),
        });
    };

    selectedItemMenu = (menu) => {
        this.props.toggleMenu(menu);
    };

    // componentDidUpdate(prevProps) {
    //     if (prevProps.currentMenus.length !== this.props.currentMenus.length) {
    //         ReactTooltip.rebuild();
    //     }
    // }

    remove = (menu) => {
        this.setState({ stateMenu: menu }, () => {
            // ReactTooltip.hide();
            this.props.toggleMenu(menu);
        });
    };
    onBlur = (e) => {
        this.setState({ popoverMenu: false });
    };
    onFocus = (e) => {
        this.setState({ popoverMenu: true, openPopupMenu: true });
    };
    closePopupMenu = () => {
        this.onBlur();
    };
    render() {
        const { menuName, currentDisplayMenu, id, width, popoverMenu } = this.state;
        const { currentMenus, menuList } = this.props;
        return (
            <UICardContainer>
                <header className="ui-card__header">
                    <div className="ui-stack ui-stack--wrap">
                        <div className="ui-stack-item ui-stack-item--fill">
                            <h2 className="ui-heading">Thực đơn</h2>
                        </div>
                    </div>
                </header>
                <div className="ui-card__section">
                    <div className="next-field__connected-wrapper" ref={this.myInput}>
                        <input
                            id={id}
                            className="next-input next-field--connected"
                            value={menuName}
                            onChange={this.handleInputSearchChange}
                            onFocus={() =>
                                this.handleInputSearchChange({ target: { value: menuName } })
                            }
                            placeholder="Tìm kiếm thực đơn"
                            autoComplete="off"
                        />
                        <button
                            type="button"
                            onClick={this.togglePopoverMenu}
                            className="btn btn--icon next-field--connected next-field--connected--no-flex ol-n"
                        >
                            <svg className="next-icon next-icon--size-16">
                                <use xlinkHref={`#${selectChevron.id}`}></use>
                            </svg>
                        </button>
                        <div>
                            <Popover
                                tabIndex="1"
                                onBlur={this.onBlur}
                                onFocus={this.onFocus}
                                placement="bottom-start"
                                modifiers={{ flip: { behavior: ["bottom-start"] } }}
                                isOpen={popoverMenu}
                                target={id}
                                className="po-wrap"
                                style={{ width: `${width}px` }}
                                toggle={this.togglePopoverMenu}
                            >
                                <PopoverBody
                                    className="po-body ui-popover__content"
                                    style={{ maxHeight: "300px" }}
                                >
                                    <div className="ui-popover__pane scroll-shadow--bottom">
                                        <ul className="js-autocomplete-suggestions next-list next-list--compact next-list--toggles">
                                            {currentDisplayMenu.length === 0 ? (
                                                menuName.trim() === "" ? (
                                                    <li
                                                        className="next-list__item"
                                                        style={{
                                                            padding: "5px 20px",
                                                            pointerEvents: "none",
                                                        }}
                                                    >
                                                        <div
                                                            className="next-grid next-grid--no-outside-padding next-grid--compact tc"
                                                            style={{ paddingBottom: "0" }}
                                                        >
                                                            <div
                                                                className="next-grid__cell"
                                                                style={{ textAlign: "left" }}
                                                            >
                                                                Tạo mới thực đơn để quản lý mặt hàng của bạn
                                                            </div>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    <li
                                                        className="next-list__item"
                                                        style={{
                                                            padding: "5px 20px",
                                                            pointerEvents: "none",
                                                        }}
                                                    >
                                                        <div
                                                            className="next-grid next-grid--no-outside-padding next-grid--compact tc"
                                                            style={{ paddingBottom: "0" }}
                                                        >
                                                            <div
                                                                className="next-grid__cell"
                                                                style={{ textAlign: "left" }}
                                                            >
                                                                Không có thực đơn phù hợp với kết quả tìm kiếm
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            ) : (
                                                currentDisplayMenu.map((menu) => (
                                                    <li
                                                        className="next-list__item"
                                                        key={menu.client_id}
                                                        style={{ padding: "5px 20px" }}
                                                        onClick={() => this.selectedItemMenu(menu)}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            style={{
                                                                paddingRight: "4px",
                                                                visibility: currentMenus.includes(
                                                                    menu.client_id
                                                                )
                                                                    ? "visible"
                                                                    : "hidden",
                                                            }}
                                                        />
                                                        {menu.name}
                                                    </li>
                                                ))
                                            )}
                                        </ul>
                                    </div>
                                </PopoverBody>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        {currentDisplayMenu.length ? (
                            currentDisplayMenu
                                .map((menuId) =>
                                    menuList.find((menu) => menu.client_id === menuId)
                                )
                                .filter((menu) => menu)
                                .map((menu) => (
                                    <div key={menu.client_id}>
                                        <div>{menu.name}</div>
                                        <svg
                                            data-tip="Xóa"
                                            className={`next-icon next-icon--size-20 pointer}`}
                                            onClick={() => this.remove(menu)}
                                        >
                                            <use xlinkHref={`#${cancelSmallMinor.id}`}></use>
                                        </svg>
                                    </div>
                                ))
                        ) : (
                            <div style={{ paddingTop: "5px" }}>
                                Thêm mặt hàng vào thực đơn để dễ dàng tìm kiếm khi bán hàng
                            </div>
                        )}
                    </div>
                </div>
            </UICardContainer>
        );
    }
}


export default
    AreaMenu;
