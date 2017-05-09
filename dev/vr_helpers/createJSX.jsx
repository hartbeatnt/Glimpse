  createJSX = (entity, i) => {
    let Tag =
      entity.primitive === 'PhotoSphere' ? PhotoSphere :
      entity.primitive === 'Text' ? Text :
      entity.primitive === 'Plane' ? Plane :
      entity.primitive === 'Box' ? Box :
      Entity;
    const comps = entity.components;
    const children = entity.children || [];
    return (
      <Tag key={i} {...comps}>
        { children.map((child, i) => this.createJSX(child, i)) }
      </Tag>
    )
  }
  